import { useEffect, useState } from 'react';
import { slices as defaultSlices } from './defaultValues';
import Wheel from './Wheel';

import { useAmount } from './hooks/useAmount';
import { wheelOfFortune } from './helpers';

export default function SpinningWheel() {
  const [amount, setAmount] = useAmount('$0');
  const [slices, setSlices] = useState(defaultSlices);


  useEffect(() => {
    wheelOfFortune('.spinning-wheel', setAmount);
  }, [setAmount]);

  return (
    <>
      <div>
        <span>SpinningWheel</span>
        <br />
        <span>
          Amount: <span className='number'>{amount}</span>
        </span>
      </div>
      <br />
      <Wheel slices={slices} />
    </>
  );
}
