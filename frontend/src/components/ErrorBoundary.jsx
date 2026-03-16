import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you could log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleResetError = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  handleReloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
          <div className="max-w-2xl w-full">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Error Card */}
            <div className="relative glass-card p-8 md:p-12 border-2 border-red-500/50 bg-gradient-to-br from-red-900/20 to-purple-900/20 animate-scale-in">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 animate-pulse">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                  Oops! Something Went Wrong
                </h1>
                <p className="text-gray-300 text-lg">
                  StoryWeaver AI encountered an unexpected error. Don't worry - your data is safe!
                </p>
              </div>

              {/* Error Details (Developer Mode) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mb-6 p-4 bg-black/40 rounded-lg border border-red-500/30">
                  <div className="text-xs font-mono text-red-300 space-y-2">
                    <div>
                      <span className="text-red-400 font-bold">Error:</span>{' '}
                      <span className="text-gray-300">{this.state.error.toString()}</span>
                    </div>
                    {this.state.errorInfo && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-red-400 hover:text-red-300 mb-2">
                          Stack Trace
                        </summary>
                        <pre className="text-[10px] text-gray-400 overflow-auto max-h-40 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleResetError}
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Go Back Home
                </button>
                
                <button
                  onClick={this.handleReloadPage}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20 hover:border-white/30 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reload Page
                </button>
              </div>

              {/* Helpful Tips */}
              <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <h3 className="text-blue-200 font-bold mb-2 flex items-center gap-2">
                  <span>💡</span> Quick Fixes:
                </h3>
                <ul className="text-sm text-blue-300 space-y-1 pl-6">
                  <li>• Try refreshing the page</li>
                  <li>• Check your internet connection</li>
                  <li>• Clear browser cache and cookies</li>
                  <li>• Make sure the backend server is running</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                StoryWeaver AI • Powered by Gemini 2.5 Flash
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Google Gemini Live Agent Challenge 2026
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
