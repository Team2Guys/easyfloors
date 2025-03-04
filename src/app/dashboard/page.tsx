
import DashboardMain from "./DashboardMain";
import { Suspense } from "react";
import Loader from "components/Loader/Loader";

async function Home() {

 /* eslint-disable */
  const records:any = [] //eslint-
  return (
    <Suspense fallback={<Loader />}>
        <DashboardMain records={records} />
    </Suspense>
  );
}

export default Home;
