import Router from 'next/router';

import styles from './Layout.scss';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <div className={styles.header}>
        <h1>Hacker News</h1>
        <button
          className={styles.infoBtn}
          onClick={() => Router.push('/about')}
        />
      </div>
      <div className={styles.subHeader}>
        <button
          className={styles.topStoriesBtn}
          onClick={() => Router.push('/')}
        />
        <button
          className={styles.favoriteStoriesBtn}
          onClick={() => Router.push('/')}
        />
      </div>

      {children}

      <div className={styles.footer} />
    </>
  );
}
