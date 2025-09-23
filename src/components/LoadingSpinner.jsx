function LoadingSpinner() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
