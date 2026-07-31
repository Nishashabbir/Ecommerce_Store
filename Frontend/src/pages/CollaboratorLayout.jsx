import { ThemeProvider } from "../../client/src/contexts/ThemeContext";
import { CartProvider } from "../../client/src/contexts/CartContext";
import { CheckoutProvider } from "../../client/src/contexts/CheckoutContext";
import { TooltipProvider } from "../../client/src/components/ui/tooltip";
import { Toaster } from "../../client/src/components/ui/sonner";
import { Footer } from "../components";
import { Header } from "../navigation";

export function CollaboratorLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="light">
      <CartProvider>
        <CheckoutProvider>
          <TooltipProvider>
            <Toaster />
            <Header />
            <div className="loop-shared-page">{children}</div>
            <Footer />
          </TooltipProvider>
        </CheckoutProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

