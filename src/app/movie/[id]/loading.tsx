export default function LoadingMovieDetail() {
  return (
    <main className="min-h-screen bg-black text-white px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        
        <div className="w-full h-[450px] md:h-[600px] bg-gray-800 rounded-lg" />

        <div className="flex flex-col justify-center space-y-4">
          <div className="h-10 w-2/3 bg-gray-800 rounded" />
          <div className="h-4 w-full bg-gray-800 rounded" />
          <div className="h-4 w-full bg-gray-800 rounded" />
          <div className="h-4 w-5/6 bg-gray-800 rounded" />
          <div className="h-4 w-1/2 bg-gray-800 rounded" />
        </div>

      </div>
    </main>
  );
}
