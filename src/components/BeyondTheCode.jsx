import * as motion from "motion/react-client"
import { useRef, useState, useEffect } from "react"

const hobbies = [
  "Photography",
  "Reading",
  "Traveling",
  "Gaming",
  "Cooking",
  "Music",
  "Writing",
]

export default function BeyondTheCode() {
  const constraintsRef = useRef(null)
  const [positions, setPositions] = useState([])

  const CARD_WIDTH = 120
  const CARD_HEIGHT = 50

  // Generate random positions inside container
  const randomizePositions = () => {
    if (!constraintsRef.current) return
    const box = constraintsRef.current.getBoundingClientRect()
    const maxWidth = box.width - CARD_WIDTH
    const maxHeight = box.height - CARD_HEIGHT

    const newPositions = hobbies.map(() => ({
      top: Math.random() * maxHeight,
      left: Math.random() * maxWidth,
    }))
    setPositions(newPositions)
  }

  // Initialize positions on mount
  useEffect(() => {
    randomizePositions()
  }, [])

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative overflow-hidden">
    <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-16 mb-8">Beyond the Code</h2>
      {/* Black box */}
      <motion.div
        ref={constraintsRef}
        className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {positions.length > 0 &&
          hobbies.map((hobby, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="absolute px-4 py-2 bg-white text-black font-medium rounded-xl shadow-md cursor-grab active:cursor-grabbing select-none"
              style={{
                top: positions[i].top,
                left: positions[i].left,
              }}
            >
              {hobby}
            </motion.div>
          ))}
      </motion.div>

    </div>
  </section>
  )
}
