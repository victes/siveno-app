import '../style/popup.scss'
import Image from 'next/image'
import close from '../../../../public/images/MainPage/close.png'

const PopUp = ({setActive}: any) => {
	return (
		<div className='pop-up'>
			<div className='pop-up__container'>
				<div className='pop-up__close' onClick={() => setActive(false)}>
					<Image src={close} alt='...' width={25} height={25} />
				</div>
				<div className='pop-up__img'></div>
				<div className='pop-up__text'>
				<h2 className='pop-up__title'>Получите промокод на скидку 15% </h2>
				<p className='pop-up__description'>Подпишитесь на новости SIVERO и скопируйте промокод на следующем шаге</p>
				<input type="text" placeholder='Имя' name='name' className='pop-up__input' />
				<input type="text" placeholder='Почта' name='email' className='pop-up__input' />
				<button className='pop-up__btn'>Получить промокод</button>
				</div>
			</div>
		</div>
	)
}

export default PopUp