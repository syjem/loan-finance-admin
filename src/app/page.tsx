import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Home,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "LendingAdmin - Get Instant Personal Loans in Minutes",
  description:
    "Fast, secure personal loans with competitive rates. Apply online and get approved in minutes.",
};

export default function LandingPage() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold">LendingAdmin</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#products"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Loan Products
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#security"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Security
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/deals">Login</Link>
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="#apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-800 to-teal-950 py-20 md:py-32 px-4">
        <div className="container mx-auto relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  <Zap className="mr-1 h-3 w-3" />
                  Instant Approval Available
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Get Instant Personal Loans{" "}
                  <span className="text-emerald-600">in Minutes</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Low-interest rates, flexible terms, and lightning-fast
                  approval. Get the funds you need without the hassle.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
                  asChild
                >
                  <Link href="#apply">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  asChild
                >
                  <Link href="#eligibility">Check Eligibility</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    4.9★
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Customer Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    50K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    $2B+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Loans Funded
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Loan Calculator
                    </h3>
                    <Badge className="bg-white/20 text-white">Live Rates</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/80">
                        Loan Amount
                      </label>
                      <div className="text-3xl font-bold text-white">
                        $25,000
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-white/80">
                          Interest Rate
                        </label>
                        <div className="text-xl font-semibold text-white">
                          5.99%
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-white/80">
                          Monthly Payment
                        </label>
                        <div className="text-xl font-semibold text-white">
                          $483
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-teal-100 text-emerald-950 hover:bg-teal-100/90">
                    Get Your Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Product Highlights */}
      <section id="products" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Choose Your Perfect Loan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re consolidating debt, funding a project, or
              covering unexpected expenses, we have the right loan for you.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border-2 hover:border-emerald-200 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle>Personal Loans</CardTitle>
                    <CardDescription>For any personal expense</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Amount
                    </span>
                    <span className="font-semibold">$1K - $100K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">APR</span>
                    <span className="font-semibold">5.99% - 24.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Term</span>
                    <span className="font-semibold">2 - 7 years</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    No collateral required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Fixed monthly payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    No prepayment penalties
                  </li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-emerald-200 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Home className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Home Improvement</CardTitle>
                    <CardDescription>Upgrade your living space</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Amount
                    </span>
                    <span className="font-semibold">$5K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">APR</span>
                    <span className="font-semibold">4.99% - 19.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Term</span>
                    <span className="font-semibold">3 - 15 years</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Home equity options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Tax-deductible interest
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Flexible draw periods
                  </li>
                </ul>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-emerald-200 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Business Loans</CardTitle>
                    <CardDescription>Grow your business</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Amount
                    </span>
                    <span className="font-semibold">$10K - $5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">APR</span>
                    <span className="font-semibold">6.99% - 29.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Term</span>
                    <span className="font-semibold">1 - 10 years</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    SBA loan options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Equipment financing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Working capital lines
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-emerald-950 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your loan in three simple steps. Our streamlined process makes
              borrowing fast and easy.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">1. Apply Online</h3>
                <p className="text-muted-foreground">
                  Fill out our simple application form in just 5 minutes. No
                  paperwork, no visits to the bank.
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  2. Get Instant Decision
                </h3>
                <p className="text-muted-foreground">
                  Our advanced algorithms provide you with an instant decision.
                  Know your approval status in seconds.
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">3. Receive Funds</h3>
                <p className="text-muted-foreground">
                  Once approved, funds are deposited directly into your bank
                  account as soon as the next business day.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              asChild
            >
              <Link href="#apply">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security & Transparency */}
      <section id="security" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Your Security is Our Priority
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We use bank-level security and transparent practices to keep your
              information safe and secure.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">256-bit SSL Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with the same encryption used by major
                  banks.
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Secure Data Storage</h3>
                <p className="text-sm text-muted-foreground">
                  All personal information is stored in secure, encrypted
                  databases.
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Privacy Protected</h3>
                <p className="text-sm text-muted-foreground">
                  We never sell your personal information to third parties.
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Transparent Terms</h3>
                <p className="text-sm text-muted-foreground">
                  No hidden fees or surprise charges. Everything is clearly
                  disclosed.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 bg-gradient-to-r from-emerald-950 to-teal-900 rounded-2xl p-8">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Regulated & Compliant</h3>
                <p className="text-muted-foreground">
                  We&apos;re fully licensed and regulated by state and federal
                  authorities. Our lending practices comply with all applicable
                  laws and regulations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline">FDIC Insured</Badge>
                  <Badge variant="outline">SOC 2 Compliant</Badge>
                  <Badge variant="outline">CCPA Compliant</Badge>
                  <Badge variant="outline">Equal Housing Lender</Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex bg-emerald-700 items-center gap-2 rounded-lg p-6 shadow-lg">
                  <Shield className="h-12 w-12 text-emerald-400" />
                  <div className="text-left">
                    <div className="font-bold text-2xl">A+</div>
                    <div className="text-sm text-white">Security Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="px-4 py-20 bg-gradient-to-br from-emerald-900 to-teal-700 text-white">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Manage Your Loans On-the-Go
                </h2>
                <p className="text-xl text-emerald-100">
                  Download our mobile app to apply for loans, track payments,
                  and manage your account from anywhere.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Apply in Minutes</h3>
                    <p className="text-emerald-100">
                      Quick application process optimized for mobile
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Updates</h3>
                    <p className="text-emerald-100">
                      Get instant notifications about your loan status
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Payments</h3>
                    <p className="text-emerald-100">
                      Make payments securely with biometric authentication
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-white/90"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download for iOS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download for Android
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-full bg-gradient-to-b from-teal-100 to-emerald-300 rounded-2xl p-6 text-gray-900">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold">LendingAdmin</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-emerald-100 rounded-lg p-4">
                      <div className="text-sm text-emerald-600 font-medium">
                        Current Loan
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        $25,000
                      </div>
                      <div className="text-sm text-gray-600">
                        Next payment: $483
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-emerald-600 text-white">
                        Make Payment
                      </Button>
                      <Button variant="outline" className="w-full ">
                        Apply for New Loan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" className="px-4 py-20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Get Your Loan?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who have trusted us with
              their financial needs. Apply now and get your funds as soon as
              tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
                asChild
              >
                <Link href="/deals/new">
                  Apply Now - It&apos;s Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Check Your Rate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No impact to your credit score to check your rate
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold">LendingAdmin</span>
              </div>
              <p className="text-gray-400">
                Making personal loans simple, fast, and transparent. Your
                trusted partner for all your lending needs.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Loan Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Personal Loans
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Home Improvement
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Business Loans
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Debt Consolidation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Us</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <span>1-800-LENDING</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>support@lendingadmin.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>
                    123 Finance Street
                    <br />
                    New York, NY 10001
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 LendingAdmin. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Licensing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
