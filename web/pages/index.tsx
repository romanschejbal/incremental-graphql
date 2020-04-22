import Story from '../components/Story';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { GetTopStories } from './__generated__/getTopStories';

type Story = {
  id: number;
};

function Home() {
  const { data, loading, error } = useQuery<GetTopStories>(gql`
    query GetTopStories {
      topStories {
        id
        ...StoryListing
      }
    }
    ${Story.fragment}
  `);

  if (loading || error) {
    return (
      <Layout>
        <Page>{loading ? <p>loading stories...</p> : error}</Page>
      </Layout>
    );
  }

  return (
    <Layout>
      <ul>
        {(data.topStories || []).map(story => (
          <Story key={story.id} story={story} />
        ))}
      </ul>
    </Layout>
  );
}

export default Home;
