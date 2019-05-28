import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../schema.graphql';

export interface IContext {
  fetchJson<T>(url: string): Promise<T>;
}

const resolvers = {
  Item: {
    __resolveType: (item: any) =>
      item.type === 'comment' ? 'Comment' : 'Story',
  },
  Story: {
    async kids(story: any, _: any, context: IContext) {
      return await Promise.all(
        (story.kids || []).map((id: number) =>
          context.fetchJson(`/api/item/${id}`)
        )
      );
    },
  },
  Comment: {
    async kids(comment: any, _: any, context: IContext) {
      return await Promise.all(
        (comment.kids || []).map((id: number) =>
          context.fetchJson(`/api/item/${id}`)
        )
      );
    },
    async parent(comment: any, _: any, context: IContext) {
      return context.fetchJson(`/api/item/${comment.parent}`);
    },
  },
  Query: {
    async topStories(_: any, { offset, limit }: any, context: IContext) {
      const storyIds = await context.fetchJson<number[]>(
        `/api/top-stories?offset=${offset}&limit=${limit}`
      );
      const stories = await Promise.all(
        storyIds.map(storyId => context.fetchJson(`/api/item/${storyId}`))
      );
      return stories;
    },
  },
};

export default function createExecutableSchema() {
  return makeExecutableSchema({ typeDefs, resolvers });
}
