import { BiCube } from "react-icons/bi";
import ModelCard from "../src/components/ModelCard";
import PlaceholderCard from "../src/components/PlaceholderCard";
import Footer from "../src/components/footer";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <header className="mb-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <BiCube className="h-10 w-10 text-blue-600 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                senseBox 3D Models
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore interactive 3D models for your senseBox projects
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModelCard
              title="Bike Model"
              description="Interactive 3D model of a bicycle with animated components"
              path="/bike"
            />

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AR-Test</h3>
                <p className="text-gray-600 mb-4">
                  Test the AR functionality with Google Model Viewer
                </p>
                <Link 
                  to="/ar-test" 
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  AR-Test starten
                </Link>
              </div>
            </div>

            <PlaceholderCard />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
