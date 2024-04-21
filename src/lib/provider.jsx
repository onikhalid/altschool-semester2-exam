import { useEffect, useState } from 'react';
import { sideBarResultFallback } from '../constants';
import { DataContext } from './context'
import { octokit } from './utils';

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setLoadingUserData] = useState(true)
    const [repos, setRepos] = useState([])
    const [isLoadingRepos, setLoadingRepos] = useState(true)

        const fetchData = async () => {
            try {

                const userProfileResult = await octokit.request('GET /user', {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })

                const userRepoResult = await octokit.request('GET /users/onikhalid/repos', {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                const storedFakeRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
                setRepos([...storedFakeRepos, ...userRepoResult.data])
                setUserData(userProfileResult.data)
            } catch (error) {
                console.error(error)
                setUserData(sideBarResultFallback.data)
            }
            finally {
                setLoadingUserData(false)
                setLoadingRepos(false)
            }
        }
    useEffect(() => {


        fetchData()
        window.addEventListener('message', fetchData);

        return () => {
            window.removeEventListener('message', fetchData);
        };
    }, [])


    useEffect(() => {

        const accessTokenChangeListener = (e) => {
            if (e.data === 'localReposUpdated') {
               fetchData()
            }

        };

        window.addEventListener('message', accessTokenChangeListener);

        return () => {
            window.removeEventListener('message', accessTokenChangeListener);
        };
    }, []);


    const value = {
        userData,
        isLoadingUserData,
        repos,
        isLoadingRepos,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


// fetch('https://api.github.com/graphql', {


