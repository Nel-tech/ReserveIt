import '../../../index.css';
import food1 from '../../../assets/food1.png'
import { FaCheck } from 'react-icons/fa';
function FoodAds() {
  return (
    <section>
      <h1 className="mt-[3rem] text-center text-[1.6rem] xs:text-[1rem]  xs:font-bold sm:text-[1.5rem] sm:font-bold">
        Perfect Place For An Exceptional Experience
      </h1>

    <main className=" mt-[3rem] flex items-center justify-evenly xs:flex-col sm:flex-col sm:justify-center md:justify-center md:self-center md:items-center">
  <article className="text-center">
    <h2 className=" max-w-[15rem] text-[2rem] font-bold text-[#AD343E] xs:pb-[1rem] xs:text-[1.2rem] sm:max-w-[16rem] sm:pb-[1rem] sm:text-[1.4rem] md:text-[1.5rem]">
      Great Food Steak & Great Restaurant
    </h2>
  </article>

  <figure className="mx-4">
    <img
      src={food1}
      className="w-[18rem] xs:w-[11rem] sm:w-[12rem] md:w-[12rem]"
      alt="Delicious food presentation"
    />
  </figure>

  <article className='xs:mt-[1rem] sm:pt-[2rem]'>
    <ul className="flex items-center gap-1 pb-[1.4rem]">
      <li>
        <FaCheck className="text-[#AD343E] xs:text-[.8rem] sm:text-[.8rem] md:text-[.9rem]" />
      </li>
      <li>
        <p className="xs:text-[.8rem] sm:text-[.8rem] md:text-[.9rem]">
          Quality foods ingredient assurances
        </p>
      </li>
    </ul>

    <ul className="flex items-center gap-1 pb-[1.4rem]">
      <li>
        <FaCheck className="text-[#AD343E] xs:text-[.8rem] sm:text-[.8rem] md:text-[.rem]" />
      </li>
      <li>
        <p className="xs:text-[.8rem] sm:text-[.8rem] md:text-[.9rem]">
          Award-Winning Restaurant
        </p>
      </li>
    </ul>

    <ul className="flex items-center gap-1 pb-[1.4rem]">
      <li>
        <FaCheck className="text-[#AD343E] xs:text-[.8rem] sm:text-[.8rem] md:text-[.9rem]" />
      </li>
      <li>
        <p className="xs:text-[.8rem] sm:text-[.8rem] md:text-[.9rem]">Healthy Food</p>
      </li>
    </ul>
  </article>
</main>


    </section>
  );
}

export default FoodAds;
