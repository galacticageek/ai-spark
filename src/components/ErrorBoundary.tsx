import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white border border-[#E5E5E0] p-8 text-center space-y-4 m-4 md:m-8">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1A1A1A]">Something went wrong</h2>
            <p className="text-xs text-[#8C8C88] mt-1 max-w-md mx-auto">
              A rendering error occurred in this view. The rest of the application should still work.
            </p>
          </div>
          {this.state.error && (
            <div className="p-3 bg-[#F9F9F7] border border-[#E5E5E0] text-[10px] font-mono text-left w-full max-w-xl overflow-x-auto text-[#6B6B66]">
              {this.state.error.toString()}
            </div>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
