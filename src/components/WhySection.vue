<template>
  <section class="py-16 px-20 w-screen bg-regular-yellow max-[499px]:px-8">
    <div class="flex flex-col items-center mx-auto max-w-1200">
        <h2 class="pb-12 text-3xl tracking-widest text-center font-bold max-[499px]:text-2xl">
            Why should you have a workout plan?
        </h2>
        <p class="mb-8 text-2xl text-center max-[499px]:text-xl">
            Below you’ll find some benefits that come along with a well-structured workout plan:
        </p>

        <ul class="list-none">
            <li class="flex items-center mb-4 max-w-4xl">
                <img src="/img/check-circle-svgrepo-com.svg" alt=""
                class="mr-4 h-8 max-[599px]:hidden">
                <p class="text-justify max-[599px]:text-center max-[499px]:text-sm">
                    <span class="font-bold">
                        Choosing the right exercises
                    </span>
                    - a process of  making a plan forces you to think about exercises that are
                    right for your personal situation, including things like your
                    level of fitness, an amount of time you’re willing to spend at the gym,
                    the equipment available at your gym etc.
                </p>
            </li>

            <li class="flex items-center mb-4 max-w-4xl">
                <img src="/img/check-circle-svgrepo-com.svg" alt=""
                class="mr-4 h-8 max-[599px]:hidden">
                <p class="text-justify max-[599px]:text-center max-[499px]:text-sm">
                    <span class="font-bold">
                        Tracking your progress
                    </span>
                     - have you ever heard that you should apply progressive overload to your
                     workouts to gain muscle? Well, you should. If you know how much weight
                     you lifted the last time, it’ll be easy to set a new goal for the next
                     workout. Over a longer period of time, you may evaluate if you’re
                     getting stronger in given exercises which is a clear indication of
                     properly executed gym sessions.
                </p>
            </li>
            <li class="flex items-center max-w-4xl">
                <img src="/img/check-circle-svgrepo-com.svg" alt=""
                class="mr-4 h-8 max-[599px]:hidden">
                <p class="text-justify max-[599px]:text-center max-[499px]:text-sm">
                    <span class="font-bold">
                        Having a better life
                    </span>
                     - after some time of properly executing your workouts, you’ll notice
                     a significant improvement in your physique, self-esteem, as well as
                     general health. This will in turn motivate you to keep living
                     a healthy lifestyle.
                </p>
            </li>
        </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WhySection'
}
</script>
