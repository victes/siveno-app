import { Container } from "@/shared/ui/Container";
import Link from "next/link";

const page = () => {
    return (
        <Container className='flex justify-center items-center h-[100vh] gap-20'>
            <h1 className='text-[120px] '>404</h1>
            <div className='flex flex-col justify-center items-center gap-6'>
                <p className='text-[50px]'>Страница не найдена</p>
                <Link href="/">
                    <button className='btn border-[#aeadc1] bg-transparent  hover:bg-transparent hover:text-[#000]'>На главную</button>
                </Link>
            </div>
        </Container>
    );
};

export default page;
