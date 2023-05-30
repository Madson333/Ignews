import { render, screen } from "@testing-library/react"
// import { mocked } from "jest-mock"
// import { useSession } from "next-auth/react"
import { SubscribeButton } from "."


jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe("SubscribeButton component", () => {
  test("renders correctly", () => {

    render(
      <SubscribeButton />

    )

    expect(screen.getByText("Subscribe Now")).toBeInTheDocument()
  })




})

