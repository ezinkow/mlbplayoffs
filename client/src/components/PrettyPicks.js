import React, { useEffect } from "react";
// import feather from "feather-icons";

export default function PicksDisplay() {
    // useEffect(() => {
    //     feather.replace();

    //     // Animate pick cards on mount
    //     const cards = document.querySelectorAll(".pick-card");
    //     cards.forEach((card, index) => {
    //         card.style.opacity = "0";
    //         card.style.transform = "translateY(20px)";
    //         setTimeout(() => {
    //             card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    //             card.style.opacity = "1";
    //             card.style.transform = "translateY(0)";
    //         }, index * 100);
    //     });
    // }, []);

    return (
        <div className="bg-gray-50 font-inter">
          {/* Header */}
          <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <i data-feather="award" className="w-8 h-8 text-yellow-300"></i>
                  <h1 className="text-2xl md:text-3xl font-bold">PickMaster Pro</h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" className="text-white hover:text-yellow-200 smooth-transition font-medium">Dashboard</a>
                  <a href="#" className="text-white hover:text-yellow-200 smooth-transition font-medium">My Picks</a>
                  <a href="#" className="text-white hover:text-yellow-200 smooth-transition font-medium">Leaderboard</a>
                  <a href="#" className="text-white hover:text-yellow-200 smooth-transition font-medium">Stats</a>
                </nav>
                <button className="md:hidden">
                  <i data-feather="menu" className="w-6 h-6"></i>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-10 card-hover">
                <div className="md:flex">
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                      Make Your Winning Picks Today
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Join thousands of sports enthusiasts predicting outcomes and climbing the leaderboard!
                    </p>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg shadow-md smooth-transition w-full md:w-auto">
                      Submit New Pick
                    </button>
                  </div>
                  <div className="hidden md:block md:w-1/2">
                    <img
                      src="http://static.photos/sport/640x360/5"
                      alt="Sports celebration"
                      className="rounded-lg object-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Picks Submission Section */}
            {/* (You’d convert the rest of the sections just like this, swapping `class` → `className` and keeping JSX structure) */}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h5 className="text-xl font-bold mb-4">PickMaster Pro</h5>
                  <p className="text-gray-400">
                    The ultimate platform for sports prediction enthusiasts to showcase their knowledge and compete with others.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Home</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Submit Picks</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Leaderboard</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Statistics</a></li>
                  </ul>
                </div>
                {/* ... sports links, connect links, etc. */}
              </div>
              <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                <p>© 2023 PickMaster Pro. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
    );
}
