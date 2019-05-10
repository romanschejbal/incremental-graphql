import styles from './Comment.scss';
import gql from 'graphql-tag';

Comment.fragment = gql`
  fragment CommentFragment on Comment {
    id
    text
  }
`;

export default function Comment(props) {
  const { comment } = props;
  const time = new Date(comment.time * 1000);
  return (
    <div class={styles.comment}>
      <h3>{comment.by}</h3>
      <span>
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
      </span>
      <p dangerouslySetInnerHTML={{ __html: comment.text }} />
    </div>
  );
}
