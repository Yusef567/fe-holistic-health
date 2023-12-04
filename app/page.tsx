"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="px-10 font-sans">
      <section className="flex justify-center items-center">
        <div className="mx-1 md:mx-10 text-left md:text-center py-10">
          <header>
            <motion.h1
              className="text-4xl py-2 md:text-6xl lg:text-8xl font-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Holistic Health
            </motion.h1>
            <motion.h2
              className="text-xl py-2 md:text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Inspiring Healthier Lives, Through Awareness, Prevention and
              Management
            </motion.h2>
          </header>
          <motion.p
            className="text-left text-lg py-2 leading-8 md:text-xl md:leading-10 lg:text-2xl lg:leading-10 font-poppins font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to Holistic Health, our platform is designed to empower
            individuals and families by providing knowledge on various topics,
            from respiratory and heart illnesses to lifestyle choices and mental
            well-being. Take part in this learning journey through our
            interactive and enjoyable quizzes designed to engage and inform
          </motion.p>
          <motion.p
            className="text-left text-lg py-2 leading-8 md:text-xl md:leading-10 lg:text-2xl lg:leading-10  font-poppins font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Join in on the learning by taking part in informative quizzes,
            without the need for an account. When you decide to sign up enhanced
            features await, enabling you to express your preferences through
            liking, disliking, and commenting on quizzes. Additionally,
            healthcare professionals can play an active role by contributing
            quizzes, ensuring accuracy, and fostering a collaborative
            environment for health education
          </motion.p>
          {!isAuthenticated() ? (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h3 className=" text-center text-4xl py-2 font-semibold">
                Get Started
              </h3>
              <div className=" text-center flex justify-center py-4 gap-6">
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 font-medium py-2 rounded min-w-[130px] cursor-pointer hover:opacity-95"
                  aria-label="Log In"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-black  font-medium py-2 rounded min-w-[130px] cursor-pointer hover:opacity-95"
                  aria-label="Sign Up"
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Home;
