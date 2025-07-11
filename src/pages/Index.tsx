
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Code, Download, Palette, Shield, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Index = () => {
  const features = [
    {
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: "Industry Templates",
      description: "Choose from professional templates designed for cosmetics, pharmacy, education and more."
    },
    {
      icon: <Code className="h-12 w-12 text-green-600" />,
      title: "Clean Code Export",
      description: "Download your website as clean HTML, CSS, and JavaScript files in a ZIP package."
    },
    {
      icon: <Palette className="h-12 w-12 text-purple-600" />,
      title: "Easy Customization",
      description: "Customize colors, images, content, and branding to match your business perfectly."
    },
    {
      icon: <Download className="h-12 w-12 text-orange-600" />,
      title: "Instant Download",
      description: "Get your complete website files instantly after customization is complete."
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Secure Platform",
      description: "Your data and creations are protected with enterprise-grade security."
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Generate professional websites in minutes, not hours or days."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">WebsiteBoss</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/signin">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Professional 
              <span className="text-blue-600 block">Websites in Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose from industry-specific templates, customize with your content, 
              and download clean, professional website code instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                  Start Building Now
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Build Amazing Websites
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to help you create professional websites without the complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Templates for Every Industry
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional templates designed specifically for your business type.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-pink-600">
                  Cosmetics & Beauty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center">
                  Elegant templates perfect for beauty salons, cosmetic brands, and skincare businesses.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-600">
                  Pharmacy & Healthcare
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center">
                  Professional templates for pharmacies, clinics, and healthcare providers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-blue-600">
                  Education & Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center">
                  Modern templates for schools, universities, and online learning platforms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust WebsiteBoss to create their professional online presence.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">WebsiteBoss</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500">
              © 2024 WebsiteBoss. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
