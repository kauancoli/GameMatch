import { MainHeader } from "@components/Header/Header";
import { DetailProfile } from "@screens/Home/detailProfile";
import Routes from "src/routes/routes";

export default function App() {
  return (
    <>
    <MainHeader />
    <Routes />
    </>
    );
}

// export default function App() {
//   return <DetailProfile />;
// }
