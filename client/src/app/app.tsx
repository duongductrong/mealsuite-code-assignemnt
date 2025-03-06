import { Route, Routes } from "react-router-dom";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import { Toaster } from "react-hot-toast";
import TicketDetails from "./ticket-details/ticket-details";
import Tickets from "./tickets/tickets";

const queryClient = new QueryClient();

const App = () => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <div className="p-4">
          <h1 className="font-bold text-lg">Ticketing App</h1>
          <Routes>
            <Route path="/" element={<Tickets />} />
            <Route path=":id" element={<TicketDetails />} />
            {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          </Routes>
        </div>

        <Toaster />
      </QueryClientProvider>
    </NuqsAdapter>
  );
};

export default App;
