"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Heart, Play, RotateCcw } from "lucide-react";

interface AnimationState {
  currentSlide: number;
  isPlaying: boolean;
  hasStarted: boolean;
  showWatchAgain: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AnimationState>({
    currentSlide: 0,
    isPlaying: false,
    hasStarted: false,
    showWatchAgain: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    audioRef.current = new Audio("/audio/happy_birthday.mp3");
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutRefs.current.push(timeout);
    return timeout;
  };

  const playAudioSegment = (startTime: number, duration?: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play().catch(console.error);

      if (duration) {
        addTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }, duration * 1000);
      }
    }
  };

  const startAnimation = () => {
    setState((prev) => ({
      ...prev,
      hasStarted: true,
      isPlaying: true,
      currentSlide: 1,
    }));
    clearAllTimeouts();

    addTimeout(() => {
      // playAudioSegment(6, 6); // Start at Slide 2 with music
      setState((prev) => ({ ...prev, currentSlide: 2 }));
    }, 3000);

    addTimeout(() => {
      // playAudioSegment(6, 6);
      setState((prev) => ({ ...prev, currentSlide: 3 }));
    }, 7000);

    addTimeout(() => {
      setState((prev) => ({ ...prev, currentSlide: 4 }));
    }, 10000);

    addTimeout(() => {
      setState((prev) => ({ ...prev, currentSlide: 5 }));
    }, 14000);

    addTimeout(() => {
      // playAudioSegment(4, 6);

      setState((prev) => ({ ...prev, currentSlide: 6 })); // Silent
    }, 25000);

    addTimeout(() => {
      setState((prev) => ({ ...prev, currentSlide: 7 }));
      playAudioSegment(13); // Start full music at Slide 7
    }, 30000);

    addTimeout(() => {
      setState((prev) => ({ ...prev, currentSlide: 8 }));
    }, 38000);

    addTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentSlide: 9,
        isPlaying: false,
        showWatchAgain: true,
      }));
    }, 45000);
  };

  const watchAgain = () => {
    setState({
      currentSlide: 0,
      isPlaying: false,
      hasStarted: false,
      showWatchAgain: false,
    });
    clearAllTimeouts();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const renderSlide = () => {
    const slideClass =
      "min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out px-4 sm:px-6 lg:px-8";

    switch (state.currentSlide) {
      case 0:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600`}
          >
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <div className="relative">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 animate-bounce-gentle">
                  🎉
                </h1>
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 animate-spin-slow">
                  <Heart
                    className="w-6 h-6 sm:w-8 sm:h-8 text-pink-300"
                    fill="currentColor"
                  />
                </div>
              </div>
              <button
                onClick={startAnimation}
                className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 sm:px-12 py-3 sm:py-4  text-lg sm:text-xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                  <span>Start the Magic ✨</span>
                </div>
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-rose-400 to-pink-600`}
          >
            <div className="text-center animate-slide-up max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-text-glow">
                Hii
              </h1>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-pink-100 animate-float">
                Florence 🎀
              </h2>
            </div>
          </div>
        );

      case 2:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-purple-500 to-indigo-600`}
          >
            <div className="text-center space-y-4 sm:space-y-6 animate-slide-up max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-text-shimmer leading-tight">
                Such a Beautiful name!
              </h2>
              <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-100 font-semibold animate-fade-in-delayed">
                Florence
              </p>
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-purple-200 font-medium animate-fade-in-delayed-2 leading-relaxed">
                Because you are Beautiful ✨
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-yellow-400 to-orange-500`}
          >
            <div className="text-center animate-bounce-in max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white animate-pulse-gentle leading-tight">
                It's your birthday!!! 🎂
              </h2>
              <div className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl animate-bounce-gentle">
                🎉🎈🎊
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-green-400 to-blue-500`}
          >
            <div className="w-full max-w-xs sm:max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-scale-in">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 rounded-2xl mb-4 animate-slide-in-right">
                <p className="text-base sm:text-lg font-medium leading-relaxed">
                  Happy birthday to you!! Yay! Many many returns of the day and
                  bla bla bla... 🎉💕
                </p>
              </div>
              <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 animate-fade-in-delayed text-base sm:text-lg">
                Send  💖
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-indigo-600 to-purple-700`}
          >
            <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4 sm:space-y-6 animate-typewriter">
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-indigo-200 font-light animate-fade-in leading-relaxed">
                  That's what I was going to do.
                </p>
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-indigo-100 font-light animate-fade-in-delayed leading-relaxed">
                  But then I stopped.
                </p>
                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-semibold animate-fade-in-delayed-2 leading-tight">
                  I realised, I wanted to do something <br />
                  <span className="text-yellow-300 font-bold animate-text-glow ml-1 sm:ml-2 block sm:inline">
                    special
                  </span>
                </p>
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-purple-200 animate-fade-in-delayed-3">
                  Because,
                </p>
                <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-pink-300 font-bold animate-text-shimmer leading-tight">
                  You are Special ✨
                </p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-pink-500 to-rose-600 relative overflow-hidden`}
          >
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute animate-float-balloon-${i % 4}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  <div
                    className={`w-8 h-10 sm:w-10 sm:h-12 lg:w-12 lg:h-16 rounded-full ${
                      [
                        "bg-red-400",
                        "bg-blue-400",
                        "bg-yellow-400",
                        "bg-green-400",
                      ][i % 4]
                    } shadow-lg relative`}
                  >
                    <div className="absolute bottom-0 left-1/2 w-px h-12 sm:h-16 lg:h-20 bg-gray-600 transform -translate-x-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white animate-bounce-gentle tracking-wider">
                S O
              </h2>
              <p className="text-xl sm:text-2xl lg:text-3xl text-pink-100 mt-4 animate-fade-in-delayed">
                Let's celebrate! 🎈
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-purple-600 to-pink-600`}
          >
            <div className="text-center space-y-6 sm:space-y-8 animate-scale-in max-w-4xl mx-auto px-4 sm:px-6">
              <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                <img
                  src="./img/florence.png"
                  alt="Florence"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto aspect-[2/3] p-2 sm:aspect-[4/5] rounded-xl object-cover shadow-2xl animate-photo-reveal border-4 sm:border-8 border-white/30"
                />
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 animate-bounce">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                    🎂
                  </div>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 px-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white animate-text-glow leading-tight">
                  I'm grateful to have you in my life
                </h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-300 animate-bounce-gentle leading-tight">
                  Happy Birthday! 🎉
                </h2>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 relative overflow-hidden`}
          >
            {/* Confetti */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 animate-confetti-${
                    i % 6
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: [
                      "#ff6b6b",
                      "#4ecdc4",
                      "#45b7d1",
                      "#96ceb4",
                      "#ffeaa7",
                      "#dda0dd",
                    ][i % 6],
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 text-center space-y-6 sm:space-y-8 animate-slide-up max-w-4xl mx-auto">
              <div className="text-6xl sm:text-7xl lg:text-8xl animate-bounce-gentle">
                🎊🎉🎊
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white animate-text-glow leading-tight">
                Hope this made your day brighter! ✨
              </h2>
              <p className="text-lg sm:text-2xl lg:text-3xl text-yellow-100 animate-fade-in-delayed leading-relaxed">
                You deserve all the happiness in the world! 💕
              </p>
            </div>
          </div>
        );

      case 9:
        return (
          <div
            className={`${slideClass} bg-gradient-to-br from-indigo-600 to-purple-800`}
          >
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto">
              <div className="text-4xl sm:text-5xl lg:text-6xl animate-bounce-gentle">
                😊💖✨
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Okay, now come back and tell me if you liked it.
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-purple-200 leading-relaxed">
                Or click, if you want to watch it again.
              </p>
              {state.showWatchAgain && (
                <button
                  onClick={watchAgain}
                  className="group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-bounce-in w-full sm:w-auto"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-spin" />
                    <span>Watch Again ✨</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="relative">{renderSlide()}</div>;
};

export default App;
