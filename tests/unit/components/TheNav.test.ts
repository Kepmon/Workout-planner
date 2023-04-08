import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import TheNav from '../../../src/components/TheNav.vue'


describe('TheNav', () => {
    const renderTheNav = (isSignedIn: boolean) => {
        const pinia = createTestingPinia({
            initialState: {
                user: {
                    isSignedIn
                }
            }
        })

        render(TheNav, {
            global: {
                plugins: [pinia],
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })
    }

    const getNavItems  = () => {
        const navItems = screen.getAllByRole('link')
        return navItems.map(item => item.textContent)
    }

    describe('when the user IS NOT signed in', () => {
        it('displays correct menu items for navigation', () => {
            renderTheNav(false)

            const navItemsText = getNavItems()
            const expectedNavItems = [
                'Home',
                'Create new workout',
                'Dashboard',
                'Sign in',
                'Sign up'
            ]

            expect(navItemsText).toEqual(expectedNavItems)
        })
    })
    
    describe('when the user IS signed in', () => {
        it('displays correct menu items for navigation', () => {
            renderTheNav(true)

            const navItemsText = getNavItems()
            const expectedNavItems = [
                'Home',
                'Create new workout',
                'Dashboard',
                'Sign out'
            ]

            expect(navItemsText).toEqual(expectedNavItems)
        })
    })
})