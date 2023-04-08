import { screen, render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { RouterLinkStub } from '@vue/test-utils'

import NeedSignIn from '../../../../src/components/shared/NeedSignIn.vue'

describe('NeedSignIn', () => {
    describe('when the user is not signed in', () => {
        const renderNeedSignIn = (text: string) => {
            const pinia = createTestingPinia()
            render(NeedSignIn, {
                global: {
                    plugins: [pinia],
                    stubs: {
                        RouterLink: RouterLinkStub
                    }
                },
                props: {
                    text
                }
            })

        }

        describe('when the user is on the create page', () => {
            it('displays correct message', () => {
                renderNeedSignIn('create a workout')

                const message = screen.getByText('You need to sign in to create a workout')
                expect(message).toBeInTheDocument()
            })
        })
        
        describe('when the user is on the dashboard page', () => {
            it('displays correct message', () => {
                renderNeedSignIn('see your dashboard')

                const message = screen.getByText('You need to sign in to see your dashboard')
                expect(message).toBeInTheDocument()
            })
        })
    })
})