import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { SignIButton } from "."
import { useSession } from "next-auth/react"

jest.mock("next-auth/react")

describe("SignInButton component", () => {
  test("renders correctly when user is not authenticated", () => {
    const useSeessionMocked = mocked(useSession)

    useSeessionMocked.mockReturnValueOnce([null, false])


    render(
      <SignIButton />

    )

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument()
  })

  test("renders correctly when user is authenticated", () => {
    const useSeessionMocked = mocked(useSession)

    useSeessionMocked.mockReturnValueOnce({
      data: [
        {
          user: {
            name: "jhon Doe",
            email: "jhon.doe@exemplo.com",
          },
          expires: "2011-10-05T14:48:00.000Z"
        }, false
      ],
    })

    render(
      <SignIButton />

    )

    expect(screen.getByText("jhon Doe")).toBeInTheDocument()
  })


})

