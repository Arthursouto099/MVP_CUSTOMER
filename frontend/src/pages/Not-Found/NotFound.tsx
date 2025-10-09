import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 text-center px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <Car className="w-20 h-20 text-blue-500 mb-4 animate-bounce" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-blue-300 rounded-full blur-sm"></div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Oops! Página não encontrada 🧽
        </h1>
        <p className="text-gray-600 max-w-md mb-6">
          Parece que você derrapou na pista molhada. A página que procurava foi lavada ou nunca existiu!
        </p>

        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Voltar ao início
        </Link>
      </motion.div>
    </div>
  );
}