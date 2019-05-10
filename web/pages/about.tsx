import Layout from '../components/Layout';
import Page from '../components/Page';

export default function About() {
  return (
    <Layout>
      <Page>
        <p>
          <strong>
            Hacker News is a social news website focusing on computer science
            and entrepreneurship. It is run by Paul Graham's investment fund and
            startup incubator, Y Combinator. In general, content that can be
            submitted is defined as "anything that gratifies one's intellectual
            curiosity".
          </strong>
        </p>
        <p>
          This is an unofficial HackerNews reader with notifications for the
          most popular stories. Set the minimum number of upvotes and get
          notified when a story passes the threshold. You can also favourite
          stories to read later. For educational purposes only.
        </p>
        <p>
          Please report any bugs or request new features on{' '}
          <a href="http://github.com/romanschejbal" target="_blank">
            Github
          </a>
        </p>
        <p>&nbsp;</p>
        <p className="text-right">
          <strong>Developed &amp; Designed by</strong>
          <br />
          <a href="http://twitter.com/romanschejbal" target="_blank">
            @romanschejbal
          </a>
          &nbsp;&amp;&nbsp;
          <a href="http://twitter.com/maldonaut" target="_blank">
            @maldonaut
          </a>
        </p>
      </Page>
    </Layout>
  );
}
