import type { ComponentType } from 'react'
import { AdminDashboardPage } from './AdminDashboardPage'
import { AuthLoginPage } from './AuthLoginPage'
import { AuthRegisterPage } from './AuthRegisterPage'
import { BankAccountPage } from './BankAccountPage'
import { BlogArticlePage } from './BlogArticlePage'
import { BlogIndexPage } from './BlogIndexPage'
import { BookingPage } from './BookingPage'
import { CheckoutStepsPage } from './CheckoutStepsPage'
import { ClinicPortalPage } from './ClinicPortalPage'
import { CommerceCheckoutPage } from './CommerceCheckoutPage'
import { CommerceShopPage } from './CommerceShopPage'
import { ContactPage } from './ContactPage'
import { CourseCatalogPage } from './CourseCatalogPage'
import { CoursePlayerPage } from './CoursePlayerPage'
import { DocsArticlePage } from './DocsArticlePage'
import { DocsHomePage } from './DocsHomePage'
import { Error404Page } from './Error404Page'
import { EventDetailPage } from './EventDetailPage'
import { EventsPage } from './EventsPage'
import { HelpCenterPage } from './HelpCenterPage'
import { LandingProductPage } from './LandingProductPage'
import { LandingSaaSPage } from './LandingSaaSPage'
import { LandingStudioPage } from './LandingStudioPage'
import { LandingWaitlistPage } from './LandingWaitlistPage'
import { MaintenanceShowcasePage } from './MaintenanceShowcasePage'
import { MarketplaceHomePage } from './MarketplaceHomePage'
import { MarketplaceVendorPage } from './MarketplaceVendorPage'
import { PortfolioPage } from './PortfolioPage'
import { PricingPage } from './PricingPage'
import { ProductDetailPage } from './ProductDetailPage'
import { RealEstateDetailPage } from './RealEstateDetailPage'
import { RealEstateListingPage } from './RealEstateListingPage'
import { RestaurantMenuPage } from './RestaurantMenuPage'
import { SaasEmptyPage } from './SaasEmptyPage'
import { SaasNotificationsPage } from './SaasNotificationsPage'
import { SaasOnboardingPage } from './SaasOnboardingPage'
import { SearchPage } from './SearchPage'
import { SettingsBillingPage } from './SettingsBillingPage'
import { SettingsProfilePage } from './SettingsProfilePage'
import { ShippingMethodsPage } from './ShippingMethodsPage'
import { SocialFeedPage } from './SocialFeedPage'
import { WishlistPage } from './WishlistPage'

export const PAGE_COMPONENTS: Record<string, ComponentType> = {
  'landing-saas': LandingSaaSPage,
  'landing-product': LandingProductPage,
  'landing-studio': LandingStudioPage,
  'landing-waitlist': LandingWaitlistPage,
  pricing: PricingPage,
  contact: ContactPage,
  'auth-login': AuthLoginPage,
  'auth-register': AuthRegisterPage,
  'saas-admin': AdminDashboardPage,
  'saas-onboarding': SaasOnboardingPage,
  'saas-empty': SaasEmptyPage,
  'saas-notifications': SaasNotificationsPage,
  'blog-index': BlogIndexPage,
  'blog-article': BlogArticlePage,
  'commerce-shop': CommerceShopPage,
  'commerce-checkout': CommerceCheckoutPage,
  'commerce-pdp': ProductDetailPage,
  'commerce-wishlist': WishlistPage,
  'commerce-checkout-steps': CheckoutStepsPage,
  'commerce-shipping': ShippingMethodsPage,
  'settings-billing': SettingsBillingPage,
  'settings-profile': SettingsProfilePage,
  booking: BookingPage,
  search: SearchPage,
  'error-404': Error404Page,
  maintenance: MaintenanceShowcasePage,
  'docs-home': DocsHomePage,
  'docs-article': DocsArticlePage,
  'help-center': HelpCenterPage,
  'portfolio-editorial': PortfolioPage,
  'marketplace-home': MarketplaceHomePage,
  'marketplace-vendor': MarketplaceVendorPage,
  'social-feed': SocialFeedPage,
  'lms-catalog': CourseCatalogPage,
  'lms-player': CoursePlayerPage,
  'realestate-listing': RealEstateListingPage,
  'realestate-detail': RealEstateDetailPage,
  'restaurant-menu': RestaurantMenuPage,
  'events-list': EventsPage,
  'event-detail': EventDetailPage,
  'clinic-portal': ClinicPortalPage,
  'bank-account': BankAccountPage,
}

export function PagePreview({ pageId }: { pageId: string }) {
  const Component = PAGE_COMPONENTS[pageId]
  if (!Component) return null
  return <Component />
}
