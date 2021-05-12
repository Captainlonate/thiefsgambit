package routes

import (
	"regexp"
	"strings"
	"unicode"
)

// Found this online:
// https://golangcode.com/validate-an-email-address/
var emailRegex = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

/*
	Returns true if the provided email satisfies
	the regular expression
*/
func ValidateEmail(email string) bool {
	if len(email) < 3 && len(email) > 254 {
		return false
	}

	return emailRegex.MatchString(email)
}

/*
	Returns true if the provided string is at least
	the 'min' length, and at most the 'max' length
*/
func ValidateStringLength(str string, min int, max int) bool {
	trimmed := strings.TrimSpace(str)
	return len(trimmed) >= min && len(trimmed) <= max
}

/*
	Returns true if the provided password string:
		Is at least the 'minLength' characters
		Satisfies 3 or more categories:
			Contains an uppercase char
			Contains a lowercase char
			Contains a number
			Contains a special character
		Does not contain spaces
	Expects the password string to already be trimmed
*/
func ValidatePassword(pass string, minLength int) bool {
	var (
		upp, low, num, sym   bool
		totalLength, options int
	)

	for _, char := range pass {
		switch {
		case unicode.IsUpper(char):
			if !upp {
				options++
				upp = true
			}
			totalLength++
		case unicode.IsLower(char):
			if !low {
				options++
				low = true
			}
			totalLength++
		case unicode.IsNumber(char):
			if !num {
				options++
				num = true
			}
			totalLength++
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			if !sym {
				options++
				sym = true
			}
			totalLength++
		default:
			// Spaces are not allowed
			return false
		}
	}

	// User must have satisfied at least 3 categories
	// Uppercase, lowercase, number, special char
	return options >= 3 && totalLength >= minLength
}
