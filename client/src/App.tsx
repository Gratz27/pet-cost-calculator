import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Home from "./pages/Home";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogArticle from "./pages/blog/BlogArticle";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./contexts/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import MobileNav from "./components/MobileNav";
import BreedPage from "./pages/BreedPage";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "react-cookie-consent";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path={"/about"} component={About} />
      <Route path={"/how-it-works"} component={HowItWorks} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={Terms} />
      <Route path="/breeds/:slug" component={BreedPage} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/products/:handle"} component={ProductPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <GoogleAnalytics />
        <CurrencyProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <div className="pb-16 md:pb-0">
                <Router />
              </div>
              <MobileNav />
              <CookieConsent
                location="bottom"
                buttonText="I Accept"
                declineButtonText="Decline"
                enableDeclineButton
                cookieName="petcost_adsense_consent"
                style={{ background: "#2B373B", zIndex: 9999 }}
                buttonStyle={{ background: "#639922", color: "white", fontSize: "13px", borderRadius: "4px", padding: "8px 16px" }}
                declineButtonStyle={{ background: "transparent", color: "#fff", fontSize: "13px", border: "1px solid #fff", borderRadius: "4px", padding: "8px 16px" }}
                expires={150}
              >
                We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners. By clicking "I Accept", you consent to our use of cookies for advertising personalization.{" "}
                <a href="/privacy-policy" style={{ color: "#fff", textDecoration: "underline" }}>Learn more</a>.
              </CookieConsent>
            </TooltipProvider>
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
