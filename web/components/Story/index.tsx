import Link from 'next/link';
import classnames from 'classnames';
import styles from './Story.scss';
import gql from 'graphql-tag';
import { StoryListing } from './__generated__/StoryListing';

Story.fragment = gql`
  fragment StoryListing on Story {
    id
    title
    score
    kids {
      id
    }
    time
    by
  }
`;

export default function Story(props: { story: StoryListing }) {
  const {
    id,
    by,
    time,
    url,
    userUrl,
    seen,
    isFavorite,
    title,
    score,
    kids,
  } = props.story;
  const site = url && url.replace(/(https?:\/\/)(www\.)?([^\/]+)(.+)/, '$3');
  return (
    <li
      className={classnames(styles.story, {
        [styles.seenStory]: seen,
        [styles.favoriteStory]: isFavorite,
      })}
      key={id}
    >
      <div className={styles.scoreWrapper}>
        <button className={styles.favoriteBtn} />
        <span className={styles.score}>{score}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          <Link href={`/detail?id=${id}`}>
            <a>{title}</a>
          </Link>
        </div>
        <div className={styles.subtitle}>
          {site}
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; by <a href="#">{by}</a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          {time}
        </div>
      </div>
      <div className={styles.commentsWrapper}>
        <span>{kids && kids.length}</span>
      </div>
    </li>
  );
}
