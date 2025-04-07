import { Container } from "@/shared/ui/Container";
import Link from "next/link";

const page = () => {
    return (
        <Container className='flex justify-center items-center h-[100vh] gap-20 max-sm:gap-5 max-sm:flex-col'>
            <h1 className='text-[120px] max-sm:text-[80px] '>404</h1>
            <div className='flex flex-col justify-center items-center gap-6'>
                <p className='text-[50px] max-lg:text-[35px] max-[400px]:text-[30px] max-[350px]:text-[25px]'>Страница не найдена</p>
                <Link href="/">
                    <button className='btn border-[#aeadc1] bg-transparent  hover:bg-transparent hover:text-[#000]'>На главную</button>
                </Link>
            </div>
        </Container>
    );
};

export default page;
