import { useState } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { User } from "./src/types/user";
import { UserContext } from "./src/contexts/userContext";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
