import Comment from '../components/Comment/Comment.bs';
import Layout from '../components/Layout';
import Page from '../components/Page';
import useGet from '../hooks/useGet';
import useGets from '../hooks/useGets';

type Story = {
  id: number;
  title: string;
  kids: number[];
  url: string | null;
  text: string | null;
};

Detail.getInitialProps = async ({ query }: any) => {
  return { id: parseInt(query.id) };
};

function Detail({ id }: { id: number }) {
  const { data: story, loading, error } = useGet<Story>(`/api/item/${id}`);
  const comments = useGets<any>(
    story ? story.kids.map(id => `/api/item/${id}`) : []
  );

  if (loading || error) {
    return (
      <Layout>
        <Page>{loading ? <p>loading stories...</p> : error}</Page>
      </Layout>
    );
  }

  return (
    <Layout>
      <Page>
        <>
          <h1>{story!.title}</h1>
          <p />
          {story!.url ? (
            <iframe
              src={story!.url}
              frameBorder={0}
              style={{ width: '100%', height: '1000px' }}
            />
          ) : (
            <p>{story!.text}</p>
          )}
          <p />
          <ul>
            {(comments.data || []).map(comment => (
              <Comment comment={comment} />
            ))}
          </ul>
        </>
      </Page>
    </Layout>
  );
}

export default Detail;
