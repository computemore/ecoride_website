import sys

file_path = '/Users/kabwe/Development/ecoride_rider/lib/src/pages/payment_method_add_page.dart'
with open(file_path, 'r') as f:
    text = f.read()

old_content_start = """              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Enter the 6-digit code sent to +265${_pendingFullPhone ?? ''}.',"""

new_content_start = """              content: SizedBox(
                width: 340 * uniformScale,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Enter the 6-digit code sent to +265${_pendingFullPhone ?? ''}.',"""

if old_content_start not in text:
    print("Could not find start block")
    sys.exit(1)
    
text = text.replace(old_content_start, new_content_start)

old_content_end = """                  ),
                ],
              ),
            );
          },
        );
      },
    ).then((result) {"""

new_content_end = """                  ),
                ],
              ),
              ),
            );
          },
        );
      },
    ).then((result) {"""

if old_content_end not in text:
    print("Could not find end block")
    sys.exit(1)
    
text = text.replace(old_content_end, new_content_end)

with open(file_path, 'w') as f:
    f.write(text)

print("Patched successfully")
