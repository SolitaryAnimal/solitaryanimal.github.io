<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'

const props = withDefaults(
  defineProps<{
    angle?: number
    images?: string[]
    cardWidth?: number
    cardHeight?: number
    cardColumnGap?: number
    cardRowGap?: number
    cardRadius?: number
    animationDuration?: number
  }>(),
  {
    angle: 45,
    images: () => [],
    cardHeight: 50,
    cardWidth: 30,
    cardColumnGap: 5,
    cardRowGap: 5,
    cardRadius: 10,
    animationDuration: 10,
  },
)

const root = useTemplateRef<HTMLDivElement>('root')
const { width: rootWidth, height: rootHeight } = useElementSize(root)

const backgroundSize = computed(() => {
  const rad = (props.angle * Math.PI) / 180

  const s = Math.abs(Math.sin(rad))
  const c = Math.abs(Math.cos(rad))

  const w = rootWidth.value ?? 0
  const h = rootHeight.value ?? 0

  const width = w * c + h * s + 3
  const height = w * s + h * c + 3

  return {
    width,
    height,
  }
})

const cardImagesIndex = computed(() => {
  // 创建一个带种子的随机数生成器
  // 因为要确保界面变化更新时图片顺序不变
  function createSeededRandom(seed: number) {
    return function () {
      // 这是一个经典的 LCG 算法公式
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
  }

  const cardHeight = props.cardHeight!
  const cardWidth = props.cardWidth!
  const cardColumnGap = props.cardColumnGap
  const cardRowGap = props.cardRowGap
  const imagesLength = props.images!.length
  const backgroundHeight = backgroundSize.value.height
  const backgroundWidth = backgroundSize.value.width

  // 计算列数量
  const columnCount
    = Math.ceil((backgroundWidth + cardColumnGap) / (cardWidth + cardColumnGap))
      + 1
  // 计算行数量
  const rowCount
    = Math.ceil(
      (backgroundHeight + cardRowGap) / (cardHeight + cardRowGap) / imagesLength,
    ) * imagesLength

  // const result: number[][] = [];

  // for (let i = 0; i < columnCount - 1; i++) {
  //   const randomer = createSeededRandom(12345 + i * 5);

  //   // 生成一个随机洗牌的索引用于索引图片
  //   // const columnCards = [...Array(count).keys()].map(
  //   //   (i) => i % props.images!.length
  //   // );
  //   // for (let i = columnCards.length - 1; i > 0; i--) {
  //   //   const j = Math.floor(randomer() * (i + 1));
  //   //   [columnCards[i], columnCards[j]] = [columnCards[j]!, columnCards[i]!];
  //   // }

  //   const columnCards = [...Array(count).keys()].map((i) =>
  //     Math.floor(randomer() * props.images!.length)
  //   );

  //   // 由于需要循环所以需要所以要准备两倍的数量
  //   result.push(columnCards.concat(columnCards));
  // }

  const allCards = Array.from(
    { length: rowCount * columnCount },
    (_, i) => i % imagesLength,
  )
  const randomer = createSeededRandom(12345)
  // 生成一个随机洗牌的索引用于索引图片
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(randomer() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j]!, allCards[i]!]
  }

  const result = Array.from({ length: columnCount }, (_, i) => {
    const buf = allCards.slice(i * rowCount, (i + 1) * rowCount)
    return buf.concat(buf)
  })

  return result
})

function getSize() {
  const { width, height } = backgroundSize.value

  return {
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(-50%, -50%) rotate(${props.angle}deg)`,
    gap: `${props.cardRowGap}px`,
  }
}
</script>

<template>
  <div ref="root" class="component-root-card-background">
    <div class="background" :style="getSize()">
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <div
        v-for="(cards, rowIndex) in cardImagesIndex"
        class="row"
        :class="[rowIndex % 2 === 0 ? 'slide-up' : 'slide-down']"
        :style="{
          gap: `${props.cardColumnGap}px`,
          animationDuration: `${props.animationDuration}s`,
        }"
      >
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div
          v-for="index in cards"
          class="card"
          :style="{
            width: `${props.cardWidth}px`,
            height: `${props.cardHeight}px`,
            borderRadius: `${props.cardRadius}px`,
          }"
        >
          <div
            class="front"
            :style="{
              borderRadius: `${props.cardRadius}px`,
              backgroundImage: `url(${props.images[index]})`,
            }"
          />
          <div
            class="shadow"
            :style="{
              borderRadius: `${props.cardRadius}px`,
              backgroundImage: `url(${props.images[index]})`,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@keyframes slide-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
}

.component-root-card-background {
  all: revert;
  overflow: hidden;

  .background {
    position: relative;
    top: 50%;
    left: 50%;

    display: flex;
    align-items: start;
    justify-content: center;
  }

  .row {
    flex-shrink: 0;
    display: inline-flex;
    flex-direction: column;
    /* position: relative; */
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .slide-up {
    animation-name: slide-up;
  }

  .slide-down {
    animation-name: slide-down;
  }

  .card {
    padding: 0;
    position: relative;
  }

  .card * {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    width: 100%;
    height: 100%;
  }

  .card .front {
    filter: brightness(0.3);
    transition: filter 1s;
    /* will-change: filter; */
  }

  .card .front:hover {
    filter: brightness(1);
  }

  .card .shadow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    filter: blur(0px) brightness(1);

    transition: all 1s;
    /* will-change: filter; */

    z-index: -1;
  }

  .card:hover .shadow {
    width: 110%;
    height: 110%;

    filter: blur(30px) brightness(2);
  }
}
</style>
