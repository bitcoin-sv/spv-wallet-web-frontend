import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { ErrorBar } from './components/ErrorBar';
import styled from '@emotion/styled';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState | null {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <ErrorBar errorMsg="Something went wrong" withReloadButton />
        </Container>
      );
    }

    return this.props.children;
  }
}

const Container = styled.div`
  padding: 20px;
`;
