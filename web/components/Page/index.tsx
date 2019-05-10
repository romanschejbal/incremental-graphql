import styles from "./Page.scss";

interface IProps {
  children: React.ReactNode;
}

export default function Page({ children }: IProps) {
  return <div className={styles.page}>{children}</div>;
}
