import Story from '../components/Story';
import Layout from '../components/Layout';
import Page from '../components/Page';
import useGet from '../hooks/useGet';
import useGets from '../hooks/useGets';

type Story = {
  id: number;
};

function Home() {
  const { data: topStoryIds } = useGet<number[]>('/api/top-stories');
  const { data, loading, error } = useGets<Story>(
    (topStoryIds || []).map(id => `/api/item/${id}`)
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
      <ul>
        {(data || []).map(story => (
          <Story key={story.id} story={story} />
        ))}
      </ul>
    </Layout>
  );
}

export default Home;
