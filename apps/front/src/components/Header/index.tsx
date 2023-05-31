import {
  BreakPointHooks,
  breakpointsTailwind,
} from '@react-hooks-library/core';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';
import { AiOutlineBook } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import {
  BsCart,
  BsCpu,
  BsCurrencyExchange,
  BsLightningCharge,
  BsMic,
  BsWallet2,
} from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { GiOldMicrophone } from 'react-icons/gi';
import { GrHistory } from 'react-icons/gr';
import { IoBusinessOutline, IoLibraryOutline } from 'react-icons/io5';
import { SiGithubsponsors, SiRaspberrypi } from 'react-icons/si';
import { VscTools } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { trpc } from '@sovereign-academy/api-client';
import { JoinedCourse } from '@sovereign-academy/types';

import headerImage from '../../assets/lapin-diplome.png';
import { Button } from '../../atoms/Button';
import { useAppSelector, useDisclosure } from '../../hooks';
import { Routes } from '../../types';
import { replaceDynamicParam } from '../../utils';
import { AuthModal } from '../AuthModal';

import { FlyingMenu } from './FlyingMenu';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import { NavigationSection } from './props';

const { useGreater } = BreakPointHooks(breakpointsTailwind);

export const Header = () => {
  const { t } = useTranslation();

  const {
    open: openLoginModal,
    isOpen: isLoginModalOpen,
    close: closeLoginModal,
  } = useDisclosure();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  /* 
  const { data: courses } = trpc.content.getCourses.useQuery();

  const coursesByLevel = courses?.reduce((acc, course) => {
    if (acc[course.level]) {
      acc[course.level].push(course);
    } else {
      acc[course.level] = [course];
    }
    return acc;
  }, {} as Record<string, JoinedCourse[]>);

  const coursesItems = Object.entries(coursesByLevel ?? {}).map(
    ([level, courses]) => ({
      id: level,
      title: capitalize(level),
      items: courses.map((course) => ({
        id: course.id,
        title: course.name,
        path: replaceDynamicParam(Routes.Course, {
          courseId: course.id,
        }),
        icon: AiOutlineBook,
        description: course.goal,
      })),
    })
  );
 */

  const coursesItems = [
    {
      id: 'beginners',
      title: 'Beginner',
      items: [
        {
          id: 'btc101',
          title: 'BTC101',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'btc101',
            language: 'fr',
          }),
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'ln101',
          title: 'LN 101',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'ln101',
            language: 'fr',
          }),
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'econ101',
          title: 'ECON 101',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'econ101',
            language: 'fr',
          }),
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'more-xxx-101',
          title: 'More',
          path: Routes.Courses,
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
      ],
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      items: [
        {
          id: 'btc201',
          title: 'BTC 201',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'btc201',
            language: 'fr',
          }),

          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'econ201',
          title: 'ECON 201',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'econ201',
            language: 'fr',
          }),

          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'ln201',
          title: 'LN 201',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'ln201',
            language: 'fr',
          }),

          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'more-xxx-201',
          title: 'More',
          path: Routes.Courses,
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced',
      items: [
        {
          id: 'crypto301',
          title: 'CRYPTO 301',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'crypto301',
            language: 'fr',
          }),
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'secu301',
          title: 'SECU 301',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'secu301',
            language: 'fr',
          }),
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
        {
          id: 'fin301',
          title: 'FIN 301',
          path: replaceDynamicParam(Routes.Course, {
            courseId: 'fin301',
            language: 'fr',
          }),
          icon: AiOutlineBook,
          description:
            'Get a better understanding of bitcoin with this lessons',
        },
      ],
    },
  ];

  const sections: NavigationSection[] = [
    {
      id: 'courses',
      title: t('words.courses'),
      path: Routes.Courses,
      items: coursesItems,
    },
    {
      id: 'resources',
      title: t('words.resources'),
      path: Routes.Resources,
      items: [
        {
          id: 'resources-nested',
          items: [
            {
              id: 'library',
              title: 'Library',
              icon: IoLibraryOutline,
              description: 'Discover plenty of books to improve your knowledge',
              path: Routes.Library,
            },
            {
              id: 'podcasts',
              title: 'Podcasts',
              description: 'Explore the bitcoin ecosystem through podcasts',
              path: Routes.Podcasts,
              icon: BsMic,
            },
            {
              id: 'builders',
              title: 'Builders',
              description:
                'Learn about the companies and projects that work at making bitcoin better and growing its adoption',
              path: Routes.Builders,
              icon: IoBusinessOutline,
            },
          ],
        },
      ],
    },
    {
      id: 'tutorials',
      title: t('words.tutorials'),
      path: Routes.Tutorials,
      items: [
        {
          id: 'tutorial-nested',
          items: [
            {
              id: 'wallets',
              title: 'Wallets',
              path: Routes.Wallets,
              icon: BsWallet2,
              description: 'Secure and use your bitcoins',
            },
            {
              id: 'exchanges',
              title: 'Exchanges',
              path: Routes.Exchanges,
              icon: BsCurrencyExchange,
              description:
                'Buy and sell bitcoins on exchanges and learn about P2P',
            },
            {
              id: 'lightning',
              title: 'Lightning',
              path: Routes.Lightning,
              icon: BsLightningCharge,
              description:
                'Manage your lightning node and use the lightning network',
            },
            {
              id: 'node',
              title: 'Node',
              path: Routes.Node,
              icon: SiRaspberrypi,
              description:
                'Learn how to be self-sovereign with your own bitcoin node',
            },
            {
              id: 'mining',
              title: 'Mining',
              path: Routes.Mining,
              icon: BsCpu,
              description:
                'Mine your own bitcoins and learn about the mining industry',
            },
            {
              id: 'merchants',
              title: 'Merchants',
              path: Routes.Merchants,
              icon: BsCart,
              description:
                'Accept bitcoin payments and discover tools for merchants',
            },
          ],
        },
      ],
    },
    {
      id: 'about-us',
      title: t('words.about-us'),
      path: Routes.UnderConstruction,
      items: [
        {
          id: 'about-us-nested',
          items: [
            {
              id: 'our-story',
              title: 'Our story',
              description: 'Learn about the story of the university',
              path: Routes.UnderConstruction,
              icon: GrHistory,
            },
            {
              id: 'sponsors',
              title: 'Sponsors & collaborators',
              description: 'Discover our sponsors and collaborators',
              path: Routes.UnderConstruction,
              icon: SiGithubsponsors,
            },
            {
              id: 'teachers',
              title: 'Teachers',
              description:
                'Get to know our university teachers, apassionate bitcoiners',
              path: Routes.UnderConstruction,
              icon: FaChalkboardTeacher,
            },
            {
              id: 'support-us',
              title: 'Support Us',
              description: 'Find ways to support us, by any manner',
              path: Routes.UnderConstruction,
              icon: BiDonateHeart,
            },
          ],
        },
      ],
    },
  ];

  const isScreenMd = useGreater('sm');

  return (
    <header className="flex fixed top-0 left-0 z-20 flex-row justify-between place-items-center px-12 w-screen bg-primary-900 min-h-[92px]">
      {isScreenMd ? (
        <Link to={Routes.Home}>
          <img className="h-16" src={headerImage} alt="DecouvreBitcoin Logo" />
        </Link>
      ) : (
        <MobileMenu sections={sections} />
      )}

      {isScreenMd && <FlyingMenu sections={sections} />}
      {isScreenMd && (
        <div className="flex flex-row space-x-6 place-items-center">
          <LanguageSelector />
          {isLoggedIn && <div className="text-white">Account</div>}

          {!isLoggedIn && (
            <div className="flex flex-row space-x-4">
              <Button
                className="my-4"
                variant="tertiary"
                rounded
                onClick={openLoginModal}
              >
                Register
              </Button>
              <Button className="my-4" rounded onClick={openLoginModal}>
                Login
              </Button>
            </div>
          )}
        </div>
      )}

      <AuthModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </header>
  );
};
