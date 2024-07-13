

type Slices = string[];

export default function Wheel ({slices}: {slices: Slices}) {

  return (
    <fieldset className='spinning-wheel'>
    <ul>
      {slices.map((slice: string) => {
        return <li key={slice}>{slice}</li>;
      })}
    </ul>
    <button type='button'>SPIN</button>
  </fieldset>
  )
}