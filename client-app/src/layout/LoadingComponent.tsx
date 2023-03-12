import { Dimmer, Loader } from 'semantic-ui-react';

interface ILoadingComponentProps{
  inverted? : boolean;
  content?: string
}

const LoadingComponent = (props: ILoadingComponentProps) => {
  const { inverted, content } = props;

  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content}></Loader>
    </Dimmer>
  );
};

export default LoadingComponent;