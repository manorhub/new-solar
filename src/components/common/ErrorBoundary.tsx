import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="solar-card p-8 bg-red-50/80 border border-red-200 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-red-950">
            {this.props.fallbackTitle || 'Something went wrong while calculating.'}
          </h2>
          <p className="text-xs text-red-700 leading-relaxed">
            Please check your input values or click below to reset the tool.
          </p>
          <button
            onClick={this.handleReset}
            className="solar-button py-2.5 px-6 text-xs font-bold bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset Tool
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
