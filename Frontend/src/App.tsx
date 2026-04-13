import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/routes/ProtectedRoute";

const HomePage = lazy(() => import("@/components/pages/HomePage"));
const AboutPage = lazy(() => import("@/components/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/components/pages/ServicesPage"));
const ServiceDetailsPage = lazy(() => import("@/components/pages/service-pages/ServiceDetailsPage"));
const IndustriesPage = lazy(() => import("@/components/pages/IndustriesPage"));
const CaseStudiesPage = lazy(() => import("@/components/pages/CaseStudiesPage"));
const ResourcesPage = lazy(() => import("@/components/pages/ResourcesPage"));
const BlogDetailsPage = lazy(() => import("@/components/pages/blog-pages/BlogDetailsPage"));
const CareersPage = lazy(() => import("@/components/pages/CareersPage"));
const ContactPage = lazy(() => import("@/components/pages/ContactPage"));
const LoginPage = lazy(() => import("@/components/pages/auth-pages/LoginPage"));
const RegisterPage = lazy(() => import("@/components/pages/auth-pages/RegisterPage"));
const ApprovalPendingPage = lazy(() => import("@/components/pages/auth-pages/ApprovalPendingPage"));
const AccessDeniedPage = lazy(() => import("@/components/pages/auth-pages/AccessDeniedPage"));
const Dashboard = lazy(() => import("@/dashboard/App"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const queryClient = new QueryClient();

const pageFallback = (
  <main className="min-h-[50vh] flex items-center justify-center">
    <div className="text-sm text-muted-foreground">Loading page...</div>
  </main>
);

const MainLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={pageFallback}>
      <main>
        <Outlet />
      </main>
    </Suspense>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Suspense fallback={pageFallback}><LoginPage /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={pageFallback}><RegisterPage /></Suspense>} />
        <Route path="/approval-pending" element={<Suspense fallback={pageFallback}><ApprovalPendingPage /></Suspense>} />
        <Route path="/access-denied" element={<Suspense fallback={pageFallback}><AccessDeniedPage /></Suspense>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={pageFallback}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
