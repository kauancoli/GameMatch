import { MainHeader } from "@components/Header/Header";
import { AuthProvider } from "@hooks/useAuth";
import Routes from "@routes/routes";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <AuthProvider>
      <MainHeader />
      <Routes />
    </AuthProvider>
  );
}

// export default function App() {
//   return <DetailProfile />;
// }
