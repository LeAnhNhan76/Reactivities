import { Dimmer, Loader } from 'semantic-ui-react';

interface ISpinnerProps{
  inverted? : boolean;
  content?: string
}

const Spinner = (props: ISpinnerProps) => {
  const { inverted, content } = props;

  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content}></Loader>
    </Dimmer>
  );
};

export default Spinner;