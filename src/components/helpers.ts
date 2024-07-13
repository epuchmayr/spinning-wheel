
import { Dispatch, SetStateAction } from 'react';
import { slices } from './defaultValues';

export const getCurrentRotation = function (el: HTMLElement) {
  const st = window.getComputedStyle(el, null);
  const tr =
    st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform') ||
    'fail...';

  let degrees = 0;

  if (tr !== 'none') {
    let trim = tr.split('(')[1];
    trim = trim.split(')')[0];

    const values = trim.split(',');
    const a = values[0];
    const b = values[1];
    // const c = values[2];
    // const d = values[3];

    // const scale = Math.sqrt(a*a + b*b);

    // arc sin, convert from radians to degrees, round
    /** /
    const sin = b/scale;
    const angle = Math.round(Math.asin(sin) * (180/Math.PI));
    /*/
    degrees = Math.round(Math.atan2(+b, +a) * (180 / Math.PI));

    degrees = Math.abs((degrees - 360) % 360);
    /**/

    // setAmount(slices[Math.floor(degrees / (360 / slices.length))]);

    return slices[Math.floor(degrees / (360 / slices.length))].toString();
  }
  // console.log(
  //   'Rotated: ' + degrees + 'deg',
  //   slices[Math.floor(degrees / (360 / slices.length))]
  // );
};

export const wheelOfFortune = function (selector: string, setAmount: Dispatch<SetStateAction<string>>) {
  const node = document.querySelector(selector);
  if (!node) return;

  const spin = node.querySelector('button');
  const wheel = node.querySelector('ul');

  let animation: Animation | undefined;
  let previousEndDegree = 0;

  spin?.addEventListener('click', () => {
    console.log('initalize');
    if (animation) {
      if (animation.playState === 'paused') {
        animation.cancel(); // Reset the animation if it already exists
      } else {
        return
      }
    }

    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animation = wheel?.animate(
      [
        { transform: `rotate(${previousEndDegree}deg)`},
        { filter: 'blur(1px)'},
        { transform: `rotate(${newEndDegree}deg)`},
      ],
      {
        duration: 4000,
        direction: 'normal',
        easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
        fill: 'forwards',
        iterations: 1,
      }
    );

    animation?.finished.then(() => {
      setAmount(getCurrentRotation(wheel as HTMLElement) ?? '$0');
      if (animation) {
        animation.pause(); // Reset the animation if it already exists
      }
    }).catch((error) => {
      console.log(error);
    });

    previousEndDegree = newEndDegree;
  });
};
