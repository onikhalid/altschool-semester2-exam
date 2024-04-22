import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const NavTabs = ({ categoryArray, fallback, currentTab, sideButton, listClass }) => {




    return (
        <Tabs defaultValue={currentTab || fallback} className='relative grid h-max mb-2 md:mb-4'>
            <div className={cn('sticky top-0 flex items-center justify-between gap-x-2 lg:gap-4 overflow-x-scroll ')} >
                <TabsList
                    className={cn("grow flex items-start justify-start gap-2.5 max-md:max-w-full overflow-x-auto bg-transparent bg-none [scrollbar-width:none]  w-full !p-0 !m-0 !h-max", listClass)}
                >

                    {categoryArray?.map((category) => {
                        const { title, link, id, icon } = category

                        return (
                            <Link
                                to={link}
                                key={id}
                            >
                                <TabsTrigger
                                    className={
                                        cn(
                                            'linetaboption relative min-w-max flex-1 transition-all duration-500 md:min-w-[5rem] md:max-w-max',
                                            'py-2 md:py-1 md:px-4 ',
                                            '[@media(max-width:300px)]:text-xs font-normal leading-5 !text-[13.75px]',
                                            'focus:outline-none active:outline-none',
                                            title.toLowerCase() === currentTab.toLowerCase() ? 'active' : 'linetaboption'
                                        )
                                    }
                                    value={title.toLowerCase()}
                                >
                                    <span className='flex items-center gap-3'>
                                        {icon}{title}
                                    </span>
                                </TabsTrigger>
                            </Link>
                        );
                    })}
                </TabsList>

                <span className='max-md:hidden'>
                    {
                        sideButton && sideButton
                    }
                </span>
            </div>
        </Tabs>

    )
}

export default NavTabs