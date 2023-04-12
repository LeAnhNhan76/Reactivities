import { observer } from 'mobx-react-lite';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useActivityStore } from '../../stores/store';

interface ISpinnerProps{
  inverted? : boolean;
  content?: string
}

const Spinner = (props: ISpinnerProps) => {
  const { inverted, content } = props;
  const { isLoading } = useActivityStore();

  if(!isLoading) return <></>

  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content}></Loader>
    </Dimmer>
  );
};

export default observer(Spinner);