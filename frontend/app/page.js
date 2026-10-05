import styles from "./page.module.css";
import { getHealth } from "./lib/health";

export default async function Home() {
  const health = await getHealth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Semana 5 — Do Dev ao Deploy</h1>
        <p>Status reportado pela API Django (/api/health/):</p>
        <div className={styles.card}>
          {health.ok ? (
            <>
              <p className={styles.status}>status: {health.data.status}</p>
              <ul className={styles.items}>
                {health.data.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className={styles.error}>
              Não foi possível conectar ao backend ({health.error}).
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
